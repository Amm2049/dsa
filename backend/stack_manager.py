class Stack:
    def __init__(self):
        """
        Initialize an empty stack.
        """
        self.items = []

    def push(self, item):
        """
        Push an item onto the stack.
        :param item: The item to be added to the stack.
        """
        self.items.append(item)

    def pop(self):
        """
        Remove and return the top item from the stack.
        :return: The top item if the stack is not empty.
        :raises IndexError: If the stack is empty.
        """
        if self.is_empty():
            raise IndexError("Pop from an empty stack")
        return self.items.pop()

    def peek(self):
        """
        Return the top item from the stack without removing it.
        :return: The top item if the stack is not empty.
        :raises IndexError: If the stack is empty.
        """
        if self.is_empty():
            raise IndexError("Peek from an empty stack")
        return self.items[-1]

    def is_empty(self):
        """
        Check if the stack is empty.
        :return: True if the stack is empty, False otherwise.
        """
        return len(self.items) == 0

    def size(self):
        """
        Return the number of items in the stack.
        :return: The size of the stack.
        """
        return len(self.items)

    def __str__(self):
        """
        Return a string representation of the stack.
        :return: A string showing the stack contents.
        """
        return f"Stack({self.items})"
